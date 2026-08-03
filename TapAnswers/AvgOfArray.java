package TapAnswers;

import java.util.Scanner;

public class AvgOfArray {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int N = sc.nextInt();
        int arr[] = new int[N];
        for (int i = 0; i < N; i++) {
            arr[i] = sc.nextInt();
        }
        double avg = averageAr(arr);
        System.out.printf("%.2f", avg);
        // implement your ogic here
    }

    public static double averageAr(int arr[]) {
        double sum = 0;
        for (int i = 0; i < arr.length; i++) {
            sum = sum + arr[i];

        }
        return sum / arr.length;
    }
}
