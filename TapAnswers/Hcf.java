public class Hcf {
    public static int findHcf(int a, int b) {
        while (b != 0) {
            int temp = b;
            b = a % b;
            a = temp;

        }
        return a;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int m = sc.nextInt();
        int result=findHcf(n,m);
        System.out.println(result);
}
