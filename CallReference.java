class Driver {
    String name;
    float salary;
    int count;
    String Profession;

}

public class CallReference {
    public static void main(String[] args) {
        Driver a = new Driver();
        a.name = "Ajay Naidu";
        a.salary = 500;
        a.count = 69;
        a.Profession = "kidnapper";
        System.out.println(a.name);
        System.out.println(a.salary);
        System.out.println(a.count);
        System.out.println(a.Profession);
        Driver b;
        b = a;
        System.out.println(b.name);
        System.out.println(a.Profession);
        System.out.println(a.count);
        b.Profession = "child kidnaper";
        System.out.println(a.name);
        System.out.println(a.Profession);
        String nam = "Hemanth bamardi";
        String relation = "Gokul sister husband";
        String bava = nam;
        System.out.println(bava);
        bava = "Gokul";
        System.out.println(bava);
        System.out.println(nam);

    }
}
