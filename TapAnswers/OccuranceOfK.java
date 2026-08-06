package TapAnswers;

import java.util.Scanner;

public class OccuranceOfK {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int n = scanner.nextInt();
        int arr[] = new int[n];
        for (int i = 0; i < n; i++) {
            arr[i] = scanner.nextInt();
        }
        int k = scanner.nextInt();
        int res = occurance(arr, k);
        System.out.println(res);

    }

    public static int occurance(int arr[], int k) {
        for (int i = arr.length - 1; i >= 0; i--) {
            if (arr[i] == k) {
                return i;
            }
        }
        return -1;
    }
}
