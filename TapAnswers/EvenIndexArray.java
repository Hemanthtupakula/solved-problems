package TapAnswers;

import java.util.Scanner;

public class EvenIndexArray {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int N = sc.nextInt();
        int arr[] = new int[N];
        for (int i = 0; i < arr.length; i++) {
            arr[i] = sc.nextInt();
        }
        for (int i = 0; i < arr.length; i += 2) {
            System.out.print(arr[i] + " ");

        }
        // implement your logic here
    }
}
