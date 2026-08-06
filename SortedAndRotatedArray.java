public class SortedAndRotatedArray {

    public static boolean check(int[] nums) {
        int count = 0;
        int n = nums.length;

        for (int i = 0; i < n; i++) {

            if (nums[i] > nums[(i + 1) % n]) {
                count++;
            }
        }

        return count <= 1;
    }

    public static void main(String[] args) {

        int[] nums1 = { 3, 4, 5, 1, 2 };

        int[] nums2 = { 2, 1, 3, 4 };

        int[] nums3 = { 1, 2, 3 };

        int[] nums4 = { 1, 1, 1 };

        System.out.println("Array [3, 4, 5, 1, 2] is sorted and rotated: " + check(nums1));
        System.out.println("Array [2, 1, 3, 4] is sorted and rotated: " + check(nums2));
        System.out.println("Array [1, 2, 3] is sorted and rotated: " + check(nums3));
        System.out.println("Array [1, 1, 1] is sorted and rotated: " + check(nums4));
    }
}
