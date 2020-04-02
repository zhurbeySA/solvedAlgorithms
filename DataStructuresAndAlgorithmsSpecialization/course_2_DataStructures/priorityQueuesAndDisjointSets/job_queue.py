# python3

from collections import namedtuple

AssignedJob = namedtuple("AssignedJob", ["worker", "started_at"])


def build_heap(data):
    length = len(data)

    for i in range((length // 2) - 1, -1, -1):
        shift_down(i, data)


def shift_up(ind, data):
    parent_ind = (ind - 1) // 2
    while ind > 0 and (data[parent_ind]['prior'] > data[ind]['prior'] or
                       (data[parent_ind]['prior'] == data[ind]['prior'] and
                        data[parent_ind]['ind'] < data[ind]['ind'])):
        data[ind], data[parent_ind] = data[parent_ind], data[ind]
        ind = (ind - 1) // 2
        parent_ind = (ind - 1) // 2


def shift_down(ind, data):
    max_index = ind
    left_child = ind * 2 + 1
    right_child = ind * 2 + 2

    if left_child < len(data) and (data[left_child]['prior'] < data[max_index]['prior'] or
                                   (data[left_child]['prior'] == data[max_index]['prior'] and
                                    data[left_child]['ind'] < data[max_index]['ind'])):
        max_index = left_child

    if right_child < len(data) and (data[right_child]['prior'] < data[max_index]['prior'] or
                                    (data[right_child]['prior'] == data[max_index]['prior'] and
                                     data[right_child]['ind'] < data[max_index]['ind'])):
        max_index = right_child

    if ind != max_index:
        data[max_index], data[ind] = data[ind], data[max_index]
        shift_down(max_index, data)


def change_priority(workers, ind, value):
    old_value = workers[ind]['prior']
    workers[ind]['prior'] = value
    if value < old_value:
        shift_up(ind, workers)
    else:
        shift_down(ind, workers)


def extract_max(workers, value):
    worker = workers[0]
    change_priority(workers, 0, value)
    return worker


def assign_jobs(n_workers, jobs):
    result = []
    workers = []
    for x in range(n_workers):
        workers.append({'ind': x, 'prior': 0})

    build_heap(workers)

    for job in jobs:
        passed_time = workers[0]['prior']
        handler = extract_max(workers, workers[0]['prior'] + job)
        result.append(AssignedJob(handler['ind'], passed_time))

    return result


def main():
    n_workers, n_jobs = map(int, input().split())
    jobs = list(map(int, input().split()))
    assert len(jobs) == n_jobs

    assigned_jobs = assign_jobs(n_workers, jobs)

    for job in assigned_jobs:
        print(job.worker, job.started_at)


if __name__ == "__main__":
    main()
