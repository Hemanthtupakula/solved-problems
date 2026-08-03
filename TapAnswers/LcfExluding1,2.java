package TapAnswers;

public class LcfExluding1 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int m = sc.nextInt();
        int limit = Math.min(n, m);
        for (int i = 3; i <= limit; i++) {
            if (n % i == 0 && m % i == 0) {
                System.out.println(i);
                break;
            }
        }
        // implement your logic here
    }
}
