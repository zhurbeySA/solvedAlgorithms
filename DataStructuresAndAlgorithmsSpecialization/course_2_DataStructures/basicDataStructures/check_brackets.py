# python3

from collections import namedtuple

Bracket = namedtuple("Bracket", ["char", "position"])

def are_matching(left, right):
    return (left + right) in ["()", "[]", "{}"]

def find_mismatch(text):
    opening_brackets_stack = []
    for i, nextChar in enumerate(text):
        if nextChar in "([{":
            opening_brackets_stack.append(Bracket(nextChar, i))

        if nextChar in ")]}":
            if len(opening_brackets_stack) == 0:
                return i + 1

            previous = opening_brackets_stack.pop()
            if not are_matching(previous[0], nextChar):
                return i + 1
    if len(opening_brackets_stack) == 0:
        return 'Success'
    else:
        return opening_brackets_stack.pop()[1] + 1

def main():
    text = input()
    mismatch = find_mismatch(text)
    print(mismatch)

if __name__ == "__main__":
    main()
