# python3


def build_heap(data):
    """Build a heap from ``data`` inplace.

    Returns a sequence of swaps performed by the algorithm.
    """
    # The following naive implementation just sorts the given sequence
    # using selection sort algorithm and saves the resulting sequence
    # of swaps. This turns the given array into a heap, but in the worst
    # case gives a quadratic number of swaps.
    #
    # TODO: replace by a more efficient implementation
    # swaps = []
    # for i in range(len(data)):
    #     for j in range(i + 1, len(data)):
    #         if data[i] > data[j]:
    #             swaps.append((i, j))
    #             data[i], data[j] = data[j], data[i]
    # return swaps

    def shift_down(ind):
        max_index = ind
        left_child = ind * 2 + 1
        right_child = ind * 2 + 2

        if left_child < length and data[left_child] < data[max_index]:
            max_index = left_child

        if right_child < length and data[right_child] < data[max_index]:
            max_index = right_child

        if ind != max_index:
            data[max_index], data[ind] = data[ind], data[max_index]
            swaps.append((ind, max_index))
            shift_down(max_index)

    def shift_up(ind):
        while ind > 0 and data[(ind - 1) // 2] > data[ind]:
            data[ind], data[(ind - 1) // 2] = data[(ind - 1) // 2], data[ind]
            swaps.append((data[(ind - 1) // 2], data[ind]))
            ind = (ind - 1) // 2

    length = len(data)
    swaps = []

    for i in range((length // 2) - 1, -1, -1):
        shift_down(i)

    return swaps


def main():
    n = int(input())
    data = list(map(int, input().split()))
    assert len(data) == n

    swaps = build_heap(data)

    print(len(swaps))
    for i, j in swaps:
        print(i, j)


if __name__ == "__main__":
    main()
