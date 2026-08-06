package TapAnswers;

import java.util.Scanner;

public class OccurenceOfLargeElementArray {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int N = sc.nextInt();
        int arr[] = new int[N];
        for (int i = 0; i < arr.length; i++) {
            arr[i] = sc.nextInt();
        }
        int res = Occur(arr);
        System.out.println(res);
    }

    public static int Occur(int arr[]) {
        int max = Integer.MIN_VALUE;
        int count = 1;
        for (int i = 0; i < arr.length; i++) {

            if (arr[i] > max) {
                max = arr[i];
            } else if (arr[i] == max) {
                count++;
            }
        }
        return count;
    }
}
