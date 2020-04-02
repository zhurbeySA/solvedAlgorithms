#!/usr/bin/python3

import sys, threading

sys.setrecursionlimit(10**7) # max depth of recursion
threading.stack_size(2**27)  # new thread will get stack of such size


class TreeOrders:
    def read(self):
        self.n = int(sys.stdin.readline())
        self.key = [0 for i in range(self.n)]
        self.left = [0 for i in range(self.n)]
        self.right = [0 for i in range(self.n)]
        self.parent = [None for i in range(self.n)]
        for i in range(self.n):
            [a, b, c] = map(int, sys.stdin.readline().split())
            self.key[i] = a
            self.left[i] = b
            self.right[i] = c
            if b != -1:
                self.parent[b] = (i, 'right')
            if c != -1:
                self.parent[c] = (i, 'left')

    def is_bst(self, vertex_ind):
        return self.is_bst_recursive(vertex_ind, -10**10, 10**10)

    def is_bst_recursive(self, vertex_ind, left_boundary, right_boundary):
        # print('vertex_ind, left_boundary, right_boundary', vertex_ind, left_boundary, right_boundary)
        if vertex_ind == -1:
            return True

        if len(self.key) == 0:
            return True

        if self.key[vertex_ind] < left_boundary or self.key[vertex_ind] > right_boundary:
            return False

        return (self.is_bst_recursive(self.left[vertex_ind], left_boundary, self.key[vertex_ind] - 1) and
                self.is_bst_recursive(self.right[vertex_ind],  self.key[vertex_ind], right_boundary))


def main():
    tree = TreeOrders()
    tree.read()
    if tree.is_bst(0):
        print("CORRECT")
    else:
        print("INCORRECT")

threading.Thread(target=main).start()
