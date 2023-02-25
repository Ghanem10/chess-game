
/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 * 
 * Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
 * Output: [[1,5],[6,9]]
 */
const intervals = [[1,3],[6,9]], newInterval = [2,5]
var insert = function(intervals, newInterval) {
    let len = intervals.length;

    for (let i = 0; i < len; i++) {
        if (intervals[i][0] < newInterval[0]) {
            console.log(true);
        }
    }
};
insert(intervals, newInterval);

/**
 * overlapping intervals are elements that begin with tolarent or disparate value.
 * hence, if the first index of the intervals array at index[i] is less than the value
 * in newinterval at index[i] we can simply move or swap these elements or indicies 
 * and if the last indicies at any given index will be inserted at that specific position.
 * The point in this context is we have to maintain the correspond poition of every element 
 * that gets compared with its relative ones of the second array.
 */