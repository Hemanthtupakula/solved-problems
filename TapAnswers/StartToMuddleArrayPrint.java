package TapAnswers;

import java.util.Scanner;

public class StartToMuddleArrayPrint {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int n = scanner.nextInt();
        int arr[] = new int[n];
        for (int i = 0; i < n; i++) {
            arr[i] = scanner.nextInt();
        }

        printStartToMiddle(arr);
    }

    public static void printStartToMiddle(int[] arr) {
        for (int i = 0; i < arr.length / 2; i++) {
            System.out.print(arr[i] + " ");
        }

    }
}
