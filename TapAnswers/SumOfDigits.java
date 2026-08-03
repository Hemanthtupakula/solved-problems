package TapAnswers;

import java.util.Scanner;

public class SumOfDigits {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int num = scanner.nextInt();
        int sum = findSumOfDigits(num);
        System.out.println(sum);
    }

    public static int findSumOfDigits(int num) {
        int sum = 0;
        num = Math.abs(num);
        while (num > 0) {
            int lastDigit = num % 10;
            sum = sum + lastDigit;
            num = num / 10;
        }
        return sum;
        // Your logic here
    }
}
