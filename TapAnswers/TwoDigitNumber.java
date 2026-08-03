package TapAnswers;

import java.util.Scanner;

public class TwoDigitNumber {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int n = scanner.nextInt();
        if (n >= 10 && n <= 99) {
            System.out.println("Yes");
        } else {
            System.out.println("No");
        }

    }
}
