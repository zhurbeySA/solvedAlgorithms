# python3


class Query:
    def __init__(self, query):
        self.type = query[0]
        self.number = int(query[1])
        if self.type == 'add':
            self.name = query[2]


def read_queries():
    n = int(input())
    return [Query(input().split()) for i in range(n)]


def write_responses(result):
    print('\n'.join(result))


def process_queries(queries):
    result = []
    contacts = Dictionary(len(queries))

    for cur_query in queries:
        if cur_query.type == 'add':
            contacts.add_number(cur_query.number, cur_query.name)
        elif cur_query.type == 'del':
            contacts.del_number(cur_query.number)
        else:
            result.append(contacts.find_number(cur_query.number))

    return result


class Dictionary():
    def __init__(self, length):
        self.list = [None] * 10000000

    def add_number(self, number, name):
        self.list[number] = name

    def del_number(self, number):
        self.list[number] = None

    def find_number(self, number):
        if self.list[number] is not None:
            return self.list[number]
        else:
            return 'not found'


if __name__ == '__main__':
    queries = read_queries()
    write_responses(process_queries(queries))

