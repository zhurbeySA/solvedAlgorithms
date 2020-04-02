# python3
import random
import copy


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

# Stress testing
# operations = ['add', 'del', 'find']
# chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g']
# random.seed = 10

# while True:
#     queries = []
#     for x in range(random.randrange(1, 10 ** 2)):
#         operation = operations[random.randrange(0, 3)]
#         name = ''.join([chars[random.randrange(0, 7)] for counter in range(15)])
#         number = random.randrange(1, 10 ** 2)

#         if operation == 'add':
#             queries.append(Query([operation, number, name]))
#         else:
#             queries.append(Query([operation, number]))

#     result_2 = process_queries(queries)
#     result_1 = silly(queries)
#     if result_1 != result_2:
#         print('WRONG')
#         for query in queries:
#             if query.type == 'add':
#                 print(query.type, query.number, query.name)
#             else:
#                 print(query.type, query.number)

#         for right, wrong in zip(result_1, result_2):
#             print('answeres:', right, wrong)
#         break
#     else:
#         print('OK')


# def silly(queriiiies):
#     result = []
#     contacts = []
#
#     for cur_query in queriiiies:
#         if cur_query.type == 'add':
#             # if we already have contact with such number,
#             # we should rewrite contact's name
#             for contact in contacts:
#                 if contact.number == cur_query.number:
#                     contact.name = cur_query.name
#                     break
#             else:  # otherwise, just add it
#                 contacts.append(copy.deepcopy(cur_query))
#         elif cur_query.type == 'del':
#             for j in range(len(contacts)):
#                 if contacts[j].number == cur_query.number:
#                     contacts.pop(j)
#                     break
#         else:
#             response = 'not found'
#             for contact in contacts:
#                 if contact.number == cur_query.number:
#                     response = contact.name
#                     break
#             result.append(response)
#
#     return result


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
        self.list = [[]] * (length * 2)
        self.prime_number = 10000019
        self.a = 38
        self.b = 9
        self.m = length * 2

    def add_number(self, number, name):
        key = self.hash_value(number)
        for ind, contact in enumerate(self.list[key]):
            if contact[0] == number:
                self.list[key][ind] = [number, name]
                break
        else:
            self.list[key].append([number, name])

    def del_number(self, number):
        key = self.hash_value(number)

        for ind, contact in enumerate(self.list[key]):
            if contact[0] == number:
                self.list[key].remove(contact)

    def find_number(self, number):
        key = self.hash_value(number)

        for contact in self.list[key]:
            if contact[0] == number:
                return contact[1]

        return 'not found'

    def hash_value(self, x):
        return ((self.a * x + self.b) % self.prime_number) % self.m


if __name__ == '__main__':
    queries = read_queries()
    write_responses(process_queries(queries))

