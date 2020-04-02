# python3

import sys
import threading

sys.setrecursionlimit(10 ** 7)  # max depth of recursion
threading.stack_size(2 ** 27)  # new thread will get stack of such size


class TreeHeight:
    def __init__(self):
        self.n = int(sys.stdin.readline())
        self.root = None

        parent = list(map(int, sys.stdin.readline().split()))
        nodes = [None] * self.n

        for i in range(0, self.n, 1):
            nodes[i] = Node()

        for child_index in range(0, self.n, 1):
            parent_index = parent[child_index]
            if parent_index == -1:
                self.root = nodes[child_index]
            else:
                nodes[parent_index].add_child(nodes[child_index])

    def compute_height(self):
        if self.root is None:
            return 0
        else:
            return self.root.compute_height()


class Node:
    def __init__(self):
        self.children = []

    def add_child(self, child):
        self.children.append(child)

    def compute_height(self):
        return 1 + max(*[child.compute_height() for child in self.children], 0, 0)


def main():
    tree = TreeHeight()
    print(tree.compute_height())


threading.Thread(target=main).start()
