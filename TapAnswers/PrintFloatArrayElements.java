package TapAnswers;

import java.util.Scanner;

public class PrintFloatArrayElements {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int n = scanner.nextInt();
        float arr[] = new float[n];
        for (int i = 0; i < arr.length; i++) {
            arr[i] = scanner.nextFloat();
        }
        for (int i = 0; i < arr.length; i++) {
            System.out.println(arr[i]);
        }

    }
}
