package TapAnswers;

import java.util.Scanner;

public class ThreeDimensionArray {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int[][][] arr = new int[2][2][3];
        for (int i = 0; i <= 1; i++) {
            for (int j = 0; j <= 1; j++) {
                for (int k = 0; k <= 2; k++) {
                    System.out.println("enter school no" + (i + 1) + "class no" + (j + 1) + "student no" + (k + 1));
                    arr[i][j][k] = sc.nextInt();
                }
            }
        }
        for (int i = 0; i <= 1; i++) {
            for (int j = 0; j <= 1; j++) {
                for (int k = 0; k <= 2; k++) {

                    System.out.print(arr[i][j][k]);
                }
                System.out.println();
            }
            System.out.println();
        }
        System.out.println();

    }
}
