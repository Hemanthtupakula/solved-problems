package TapAnswers;

import java.util.Scanner;

public class MiddleToEndArray {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int n = scanner.nextInt();
        int arr[] = new int[n];
        for (int i = 0; i < arr.length; i++) {
            arr[i] = scanner.nextInt();
        }

        printMiddleToEnd(arr);
    }

    public static void printMiddleToEnd(int[] arr) {
        for (int i = arr.length / 2; i < arr.length; i++) {
            System.out.print(arr[i] + " ");
        }

    }
}
