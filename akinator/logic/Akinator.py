from uuid import uuid4
from logic import AkinatorDataSource


class Akinator(object):
    """
    Main class to handle game session.
    """
    def __init__(self, data_source):
        super(Akinator, self).__init__()
        self.__id = self.__generate_id()

        if not isinstance(data_source, AkinatorDataSource):
            raise TypeError("\'data_source\' must be an instance of AkinatorDataSource")
        self.__data_source = data_source

        self.__used_questions = []
        self.__current_question = self.__select_question()

    def __generate_id(self):
        """
        Method to generate unique identifier for a game.
        :return: game identifier
        """
        uuid = uuid4()
        return uuid.hex

    def __select_question(self):
        return None

    @property
    def game_id(self):
        return self.__id
