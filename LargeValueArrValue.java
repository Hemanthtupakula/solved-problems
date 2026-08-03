import java.util.Scanner;

public class LargeValueArrValue {
    public static int LargeValue(int[] a) {
        int max = a[0];
        int index = 0;
        for (int i = 0; i < a.length; i++) {
            if (a[i] > max) {
                max = a[i];
                index = i;
            }
        }
        return index;

    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < a.length; i++) {
            a[i] = sc.nextInt();
            int result = LargeValue(a);
            System.out.println(result);
        }

    }
}
