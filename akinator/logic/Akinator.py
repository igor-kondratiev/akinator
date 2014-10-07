from operator import itemgetter
import random
from uuid import uuid4
from logic.AkinatorDataSource import AkinatorDataSource, ANSWERS


class Akinator(object):
    """
    Main class to handle game session.
    """
    def __init__(self, data_source):
        super(Akinator, self).__init__()
        self.__id = self.__generate_id()
        self.__is_finished = False

        if not isinstance(data_source, AkinatorDataSource):
            raise TypeError("\'data_source\' must be an instance of AkinatorDataSource")
        self.__data_source = data_source

        self.__used_questions = []
        self.__current_question = None
        self.__select_question()

        self.__distribution = {}
        for e in self.__data_source.get_entities_list():
            self.__distribution[e] = 1

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

        self.__current_question = random.choice([q for q in self.__data_source.get_questions_list() if not q in self.__used_questions])
        self.__used_questions.append(self.__current_question)
        return self.__current_question

    def process_answer(self, answer):
        if answer != ANSWERS.DO_NOT_KNOW:
            for e in self.__data_source.get_entities_list():
                p = self.__data_source.get_answers_count(e.key, self.__current_question.key)[answer]
                self.__distribution[e] *= p

        self.__current_question = None
        return self.__select_question()

    # TODO: remove, this is only for debug
    def print_status(self):
        total_score = sum(x for x in self.__distribution.itervalues())
        results = [(e.name, -score * 100.0 / total_score) for (e, score) in self.__distribution.iteritems()]
        results.sort(key=itemgetter(1))

        print 'Current distribution:'
        for name, score in results:
            print u'{0} - {1}%'.format(name, -score)


    @property
    def game_id(self):
        return self.__id

    @property
    def is_finished(self):
        return self.__is_finished

    @property
    def current_question(self):
        return self.__current_question
