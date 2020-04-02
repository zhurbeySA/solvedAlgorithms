# python3

import sys, threading
sys.setrecursionlimit(10**6) # max depth of recursion
threading.stack_size(2**27)  # new thread will get stack of such size

class TreeOrders:
    def read(self):
        self.n = int(sys.stdin.readline())
        self.key = [0 for i in range(self.n)]
        self.left = [0 for i in range(self.n)]
        self.right = [0 for i in range(self.n)]
        for i in range(self.n):
            [a, b, c] = map(int, sys.stdin.readline().split())
            self.key[i] = a
            self.left[i] = b
            self.right[i] = c

    def in_order(self, vertex_ind):
        if vertex_ind == 0:
            self.result = []

        if vertex_ind == -1:
            return

        self.in_order(self.left[vertex_ind])
        self.result.append(self.key[vertex_ind])
        self.in_order(self.right[vertex_ind])

        if vertex_ind == 0:
            return self.result

    def pre_order(self, vertex_ind):
        if vertex_ind == 0:
            self.result = []

        if vertex_ind == -1:
            return

        self.result.append(self.key[vertex_ind])
        self.pre_order(self.left[vertex_ind])
        self.pre_order(self.right[vertex_ind])

        if vertex_ind == 0:
            return self.result

    def post_order(self, vertex_ind):
        if vertex_ind == 0:
            self.result = []

        if vertex_ind == -1:
            return

        self.post_order(self.left[vertex_ind])
        self.post_order(self.right[vertex_ind])
        self.result.append(self.key[vertex_ind])

        if vertex_ind == 0:
            return self.result

    def get_root(self):
        if self.key is not None:
            return 0


def main():
    tree = TreeOrders()
    tree.read()
    print(" ".join(str(x) for x in tree.inOrder(tree.get_root())))
    print(" ".join(str(x) for x in tree.preOrder(tree.get_root())))
    print(" ".join(str(x) for x in tree.postOrder(tree.get_root())))

threading.Thread(target=main).start()
