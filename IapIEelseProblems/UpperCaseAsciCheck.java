package IapIEelseProblems;

import java.util.Scanner;

public class UpperCaseAsciCheck {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int n = scanner.nextInt();
        if (n >= 65 && n <= 90) {
            System.out.println("Yes");
        } else {
            System.out.println("No");
        }

    }
}
