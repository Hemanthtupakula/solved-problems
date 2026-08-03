package TapAnswers;

public class BinarySearch {
    public static int findMax(int[] arr) {
        int left = 0;
        int right = arr.length - 1;

        while (left < right) {
            int mid = left + (right - left) / 2;

            if (arr[mid] > arr[mid + 1]) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        return arr[left];
    }

    public static void main(String[] args) {
        int[] numbers = { 1, 3, 8, 12, 4, 2 };
        int max = findMax(numbers);
        System.out.println("Maximum value: " + max);
    }
}
