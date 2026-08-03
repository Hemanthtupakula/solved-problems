package TapAnswers;

import java.util.Scanner;

public class SumDivisbleArrayElements {
    public static int divisbleSum(int arr[]) {
        int sum = 0;
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] % 3 == 0 && arr[i] % 5 == 0) {
                sum = sum + arr[i];
            }
        }
        return sum;

    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int N = sc.nextInt();
        int arr[] = new int[N];
        for (int i = 0; i < arr.length; i++) {
            arr[i] = sc.nextInt();
        }
        int res = divisbleSum(arr);
        System.out.print(res);
        // implement your logic here
    }
}
