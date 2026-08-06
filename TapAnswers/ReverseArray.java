package TapAnswers;

import java.util.Scanner;

public class ReverseArray {
    public static void reverseArray(int arr[]) {
        int left = 0;
        int right = arr.length - 1;
        while (left < right) {
            int temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;
            left++;
            right--;
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int N = sc.nextInt();
        int arr[] = new int[N];
        for (int i = 0; i < arr.length; i++) {
            arr[i] = sc.nextInt();
        }
        reverseArray(arr);
        for (int i = 0; i < N; i++) {
            System.out.print(arr[i] + " ");
        }
        // implement your logic here
    }
}
