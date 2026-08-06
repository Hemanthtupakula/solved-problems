package TapAnswers;

import java.util.Scanner;

public class AbsoulteSumOfArray {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int N = sc.nextInt();
        int arr[] = new int[N];
        for (int i = 0; i < N; i++) {
            arr[i] = sc.nextInt();
        }
        int res = absoulteValue(arr);
        System.out.println(res);

        // implement your logic here
    }

    public static int absoulteValue(int arr[]) {
        int sum = 0;
        for (int i = 0; i < arr.length; i++) {
            int abs = Math.abs(arr[i]);
            sum = sum + abs;

        }
        return sum;
    }
}
