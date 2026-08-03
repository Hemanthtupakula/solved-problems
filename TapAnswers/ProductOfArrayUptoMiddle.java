package TapAnswers;

import java.util.Scanner;

public class ProductOfArrayUptoMiddle {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int n = scanner.nextInt();
        int arr[] = new int[n];
        for (int i = 0; i < arr.length; i++) {
            arr[i] = scanner.nextInt();
        }
        int res = calculateProduct(arr);
        System.out.println(res);

    }

    public static int calculateProduct(int[] arr) {
        int product = 1;
        for (int i = 0; i < arr.length / 2; i++) {
            product = product * arr[i];
        }
        return product;

    }
}
