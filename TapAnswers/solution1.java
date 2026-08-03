package TapAnswers;

class solution1 {
    public int[] searchRange(int[] nums, int target) {
        int[] result = { -1, -1 };

        result[0] = findPosition(nums, target, true);
        if (result[0] != -1) {
            result[1] = findPosition(nums, target, false);
        }

        return result;
    }

    private int findPosition(int[] nums, int target, boolean isFirst) {
        int low = 0, high = nums.length - 1;
        int pos = -1;

        while (low <= high) {
            int mid = low + (high - low) / 2; 
            
            if (nums[mid] == target) {
                pos = mid;
                if (isFirst) {
                    high = mid - 1; 
                    
                } else {
                    low = mid + 1;  
                    
            } else if (nums[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return pos;
    }
}
