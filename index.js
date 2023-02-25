
/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 * 
 * Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
 * Output: [[1,5],[6,9]],
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