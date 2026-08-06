package TapAnswers;

import java.util.Scanner;

public class MultipleOf5 {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int n = scanner.nextInt();
        if (n % 5 == 0) {
            System.out.println("Yes");
        } else {
            System.out.println("No");
        }

    }
}
