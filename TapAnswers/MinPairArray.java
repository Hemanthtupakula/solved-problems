package TapAnswers;

import java.util.Scanner;

public class MinPairArray {
    public static int minimumPair(int arr[]) {
        int max1 = Integer.MAX_VALUE;
        int max2 = Integer.MAX_VALUE;
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] < max1) {
                max2 = max1;
                max1 = arr[i];
            } else if (arr[i] < max2) {
                max2 = arr[i];
            }
        }
        return max1 + max2;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int n = scanner.nextInt();
        int arr[] = new int[n];
        for (int i = 0; i < arr.length; i++) {
            arr[i] = scanner.nextInt();
        }
        System.out.println(minimumPair(arr));

    }
}
