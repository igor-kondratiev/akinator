from operator import itemgetter
import random
from uuid import uuid4
from math import log
from logic.AkinatorDataSource import AkinatorDataSource, ANSWERS


class AKINATOR_STAGES(object):
    STAGE_1 = 1
    STAGE_2 = 2


class Akinator(object):
    """
    Main class to handle game session.
    """

    CRITICAL_LEVEL = 0.65

    def __init__(self, data_source):
        super(Akinator, self).__init__()
        self.__id = self.__generate_id()

        if not isinstance(data_source, AkinatorDataSource):
            raise TypeError("\'data_source\' must be an instance of AkinatorDataSource")
        self.__data_source = data_source

        self.__entities_list = self.__data_source.get_entities_list()

        self.__distribution = {}
        entities_count = len(self.__entities_list)
        for e in self.__entities_list:
            self.__distribution[e] = 1.0 / entities_count

        self.__used_questions = []
        self.__current_question = None
        self.__select_question()

        question_count = len(self.__data_source.get_questions_list())
        self.__max_history_length = {
            AKINATOR_STAGES.STAGE_1: int(0.5 * question_count),
            AKINATOR_STAGES.STAGE_2: int(0.7 * question_count)
        }

        self.__stage = AKINATOR_STAGES.STAGE_1
        self.__history = {}

    def __generate_id(self):
        """
        Method to generate unique identifier for a game.
        :return: game identifier
        """
        uuid = uuid4()
        return uuid.hex

    def __select_question(self):
        """
        Selects next question
        """
        if self.__current_question:
            return self.__current_question

        current_entropy = sum(-x*log(x, 2) for x in self.__distribution.values() if x != 0)

        variants = (q for q in self.__data_source.get_questions_list() if q not in self.__used_questions)
        scores = {}
        for q in variants:
            new_entropy = 0.0
            for answer in ANSWERS.RANGE:
                distribution = self.__distribution.copy()
                for e in self.__entities_list:
                    p = self.__data_source.get_answers_count(e.key, q.key)[answer]
                    distribution[e] *= p

                # total is equal to answer_probability
                total = sum(p for p in self.__distribution.itervalues())
                for e in self.__entities_list:
                    distribution[e] /= total

                entropy = sum(-x*log(x, 2) for x in distribution.values() if x != 0)
                new_entropy += total * entropy

            scores[q] = current_entropy - new_entropy

        result = scores.items()
        result.sort(key=itemgetter(1))

        question, _ = result[0]

        self.__current_question = question
        self.__used_questions.append(self.__current_question)
        return self.__current_question

    def process_answer(self, answer):
        self.__history[self.__current_question] = answer

        if answer != ANSWERS.DO_NOT_KNOW:
            for e in self.__entities_list:
                p = self.__data_source.get_answers_count(e.key, self.__current_question.key)[answer]
                self.__distribution[e] *= p

            total = sum(p for p in self.__distribution.itervalues())
            for e in self.__entities_list:
                self.__distribution[e] /= total

            for e in self.__entities_list:
                if self.__distribution[e] >= self.CRITICAL_LEVEL:
                    return e, None

        if len(self.__history) >= self.__max_history_length[self.__stage]:
            results = self.__distribution.items()
            results.sort(key=lambda (x, y): -y)

            winner, prc = results[0]

            return winner, None

        self.__current_question = None
        return None, self.__select_question()

    # TODO: remove, this is only for debug
    def print_status(self):
        results = self.__distribution.items()
        results.sort(key=lambda (x, y): -y)

        print 'Current distribution:'
        for entity, score in results:
            print u'{0} - {1:.2f}%'.format(entity.name, 100*score)


    @property
    def game_id(self):
        return self.__id

    @property
    def current_question(self):
        return self.__current_question
