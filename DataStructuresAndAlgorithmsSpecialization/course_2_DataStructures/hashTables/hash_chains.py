# python3


class Query:
    def __init__(self, query):
        self.type = query[0]
        if self.type == 'check':
            self.ind = int(query[1])
        else:
            self.s = query[1]


class QueryProcessor:
    _multiplier = 263
    _prime = 1000000007

    def __init__(self, bucket_count):
        self.bucket_count = bucket_count
        # store all strings in one list
        self.elems = [[] for counter in range(bucket_count)]

    def _hash_func(self, s):
        ans = 0
        for c in reversed(s):
            ans = (ans * self._multiplier + ord(c)) % self._prime
        return ans % self.bucket_count

    def add_string(self, string):
        key = self._hash_func(string)
        if string in self.elems[key]:
            return
        else:
            self.elems[key].append(string)

    def del_string(self, string):
        key = self._hash_func(string)
        for ind, item in enumerate(self.elems[key]):
            if item == string:
                self.elems[key].pop(ind)
                break

    def find_string(self, string):
        key = self._hash_func(string)
        for item in self.elems[key]:
            if item == string:
                return True
        return False

    def check(self, i):
        return self.elems[i]

    def read_query(self):
        return Query(input().split())

    def write_search_result(self, was_found):
        print('yes' if was_found else 'no')

    def write_chain(self, chain):
        print(' '.join(reversed(chain)))

    def process_query(self, query):
        if query.type == "check":
            # use reverse order, because we append strings to the end
            self.write_chain(self.check(query.ind))
        else:
            if query.type == 'find':
                self.write_search_result(self.find_string(query.s))
            elif query.type == 'add':
                self.add_string(query.s)
            else:
                self.del_string(query.s)

    def process_queries(self):
        n = int(input())
        for i in range(n):
            self.process_query(self.read_query())

if __name__ == '__main__':
    bucket_count = int(input())
    proc = QueryProcessor(bucket_count)
    proc.process_queries()
