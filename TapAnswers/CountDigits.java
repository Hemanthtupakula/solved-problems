package TapAnswers;

import java.util.Scanner;

public class CountDigits {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int num = scanner.nextInt();
        int count = countDigits(num);
        System.out.println(count);
    }

    public static int countDigits(int num) {
        int count = 0;
        if (num == 0) {
            return 1;
        }
        num = Math.abs(num);
        while (num > 0) {
            num = num / 10;
            count++;
        }
        return count;
        // Your logic here
    }
}
