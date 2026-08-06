import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;
import java.io.*;
import java.net.InetSocketAddress;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.awt.Desktop;

public class Hungerbox {
    private static ArrayList<Res> restaurants = new ArrayList<>();
    private static ArrayList<Order> orders = new ArrayList<>();
    private static final int PORT = 8080;

    public static void main(String[] args) {
        // 1. Initialize Mock Data (Hotel Pullamma with 150 AP Dishes)
        initializeData();

        // 2. Start HTTP Server
        try {
            HttpServer server = HttpServer.create(new InetSocketAddress(PORT), 0);
            
            // Serve frontend files
            server.createContext("/", new StaticFileHandler("index.html", "text/html"));
            server.createContext("/style.css", new StaticFileHandler("style.css", "text/css"));
            server.createContext("/app.js", new StaticFileHandler("app.js", "application/javascript"));
            
            // Serve APIs
            server.createContext("/api/restaurants", new RestaurantApiHandler());
            server.createContext("/api/orders", new OrderApiHandler());
            server.createContext("/api/orders/update", new UpdateOrderApiHandler());
            server.createContext("/api/stats", new StatsApiHandler());

            server.setExecutor(null); // default executor
            server.start();
            
            System.out.println("=================================================");
            System.out.println("  HOTEL PULLAMMA CENTRAL ENGINE STARTED SUCCESSFULLY ");
            System.out.println("=================================================");
            System.out.println("Local Address: http://localhost:" + PORT);
            System.out.println("Press Ctrl+C in this terminal to stop the server.");
            System.out.println("=================================================");

            // Try to open the browser automatically
            try {
                if (Desktop.isDesktopSupported()) {
                    Desktop desktop = Desktop.getDesktop();
                    if (desktop.isSupported(Desktop.Action.BROWSE)) {
                        desktop.browse(new URI("http://localhost:" + PORT));
                    }
                }
            } catch (Exception e) {
                System.out.println("Notice: Could not automatically open browser. Please open http://localhost:" + PORT + " manually.");
            }

        } catch (IOException e) {
            System.err.println("Failed to start server: " + e.getMessage());
            e.printStackTrace();
        }
    }

    private static void initializeData() {
        // Create the single master restaurant profile: Hotel Pullamma
        Res pullamma = new Res("Hotel Pullamma", "Main Road, Near Temple, Andhra Pradesh");

        // The 150 authentic Andhra Pradesh dishes database
        String[][] itemData = {
            // Tiffins & Breakfast (Items 1 to 25)
            {"Babai Idli", "50.0", "Breakfast", "Veg", "Pure-Veg"},
            {"Ghee Podi Idli", "60.0", "Breakfast", "Veg", "Pure-Veg"},
            {"Neyyi Karapu Idli", "65.0", "Breakfast", "Veg", "Pure-Veg"},
            {"Sambar Idli", "55.0", "Breakfast", "Veg", "Pure-Veg"},
            {"Button Idli", "50.0", "Breakfast", "Veg", "Pure-Veg"},
            {"Masala Dosa", "80.0", "Breakfast", "Veg", "Pure-Veg"},
            {"Erra Karam Dosa", "85.0", "Breakfast", "Veg", "Pure-Veg"},
            {"Onion Dosa", "75.0", "Breakfast", "Veg", "Pure-Veg"},
            {"Ghee Roast Dosa", "90.0", "Breakfast", "Veg", "Pure-Veg"},
            {"Rava Masala Dosa", "90.0", "Breakfast", "Veg", "Pure-Veg"},
            {"MLA Dosa", "110.0", "Breakfast", "Veg", "Pure-Veg"},
            {"Pesarattu Upma", "95.0", "Breakfast", "Veg", "Vegan"},
            {"Onion Pesarattu", "85.0", "Breakfast", "Veg", "Vegan"},
            {"Dibba Rotti", "70.0", "Breakfast", "Veg", "Vegan"},
            {"Puri Curry", "60.0", "Breakfast", "Veg", "Vegan"},
            {"Pongal", "70.0", "Breakfast", "Veg", "Vegan"},
            {"Uggani Bajji", "80.0", "Breakfast", "Veg", "Vegan"},
            {"Egg Dosa", "100.0", "Breakfast", "Non-Veg", "Egg"},
            {"Chicken Keema Dosa", "130.0", "Breakfast", "Non-Veg", "Chicken"},
            {"Mutton Keema Dosa", "150.0", "Breakfast", "Non-Veg", "Mutton"},
            {"Egg Pesarattu", "110.0", "Breakfast", "Non-Veg", "Egg"},
            {"Chicken Keema Pesarattu", "140.0", "Breakfast", "Non-Veg", "Chicken"},
            {"Minapa Garelu", "60.0", "Breakfast", "Veg", "Pure-Veg"},
            {"Sambar Vada", "70.0", "Breakfast", "Veg", "Pure-Veg"},
            {"Rava Dosa", "75.0", "Breakfast", "Veg", "Pure-Veg"},
            
            // Lunch - Vindu Bhojanam (Items 26 to 55)
            {"Andhra Veg Meals Thali", "180.0", "Lunch", "Veg", "Pure-Veg"},
            {"Gutti Vankaya Koora", "130.0", "Lunch", "Veg", "Pure-Veg"},
            {"Tomato Pappu", "90.0", "Lunch", "Veg", "Pure-Veg"},
            {"Gongura Pappu", "95.0", "Lunch", "Veg", "Pure-Veg"},
            {"Dosakaya Pappu", "90.0", "Lunch", "Veg", "Pure-Veg"},
            {"Menthi Pappu", "90.0", "Lunch", "Veg", "Pure-Veg"},
            {"Kakarakaya Vepudu", "100.0", "Lunch", "Veg", "Vegan"},
            {"Bendakaya Fry", "95.0", "Lunch", "Veg", "Vegan"},
            {"Dondakaya Vepudu", "95.0", "Lunch", "Veg", "Vegan"},
            {"Aratikaaya Vepudu", "100.0", "Lunch", "Veg", "Vegan"},
            {"Chikkudukaya Koora", "110.0", "Lunch", "Veg", "Vegan"},
            {"Beerakaya Eguru", "100.0", "Lunch", "Veg", "Vegan"},
            {"Chamadumpala Pulusu", "115.0", "Lunch", "Veg", "Vegan"},
            {"Tomato Charu Bowl", "50.0", "Lunch", "Veg", "Vegan"},
            {"Miryala Rasam Bowl", "50.0", "Lunch", "Veg", "Vegan"},
            {"Pappu Charu Bowl", "60.0", "Lunch", "Veg", "Vegan"},
            {"Ulavacharu Bowl", "80.0", "Lunch", "Veg", "Vegan"},
            {"Gongura Chicken Curry", "180.0", "Lunch", "Non-Veg", "Chicken"},
            {"Andhra Chicken Fry (Kodi Vepudu)", "190.0", "Lunch", "Non-Veg", "Chicken"},
            {"Rayalaseema Natu Kodi Pulusu", "220.0", "Lunch", "Non-Veg", "Chicken"},
            {"Gongura Mutton Koora", "240.0", "Lunch", "Non-Veg", "Mutton"},
            {"Andhra Mutton Fry", "250.0", "Lunch", "Non-Veg", "Mutton"},
            {"Nellore Chepala Pulusu", "210.0", "Lunch", "Non-Veg", "Fish"},
            {"Royyala Iguru (Prawn)", "230.0", "Lunch", "Non-Veg", "Prawns"},
            {"Peethala Kura (Crab)", "240.0", "Lunch", "Non-Veg", "Crab"},
            {"Bommidala Pulusu (Fish)", "250.0", "Lunch", "Non-Veg", "Fish"},
            {"Egg Pulusu", "110.0", "Lunch", "Non-Veg", "Egg"},
            {"Egg Masala Curry", "120.0", "Lunch", "Non-Veg", "Egg"},
            {"Gobi Manchurian (AP Style)", "130.0", "Lunch", "Veg", "Vegan"},
            {"Chili Paneer (AP Style)", "150.0", "Lunch", "Veg", "Pure-Veg"},

            // Dinner Specialities & Biryanis (Items 56 to 75)
            {"Ragi Sangati", "80.0", "Dinner", "Veg", "Vegan"},
            {"Jonna Rotte", "30.0", "Dinner", "Veg", "Vegan"},
            {"Sajja Rotte", "35.0", "Dinner", "Veg", "Vegan"},
            {"Chapathi", "25.0", "Dinner", "Veg", "Vegan"},
            {"Pulaka", "20.0", "Dinner", "Veg", "Vegan"},
            {"Hyderabadi Veg Biryani", "160.0", "Dinner", "Veg", "Pure-Veg"},
            {"Paneer Biryani", "180.0", "Dinner", "Veg", "Pure-Veg"},
            {"Ulavacharu Veg Biryani", "190.0", "Dinner", "Veg", "Pure-Veg"},
            {"Kaju Biryani", "210.0", "Dinner", "Veg", "Pure-Veg"},
            {"Hyderabadi Chicken Biryani", "220.0", "Dinner", "Non-Veg", "Chicken"},
            {"Gongura Chicken Biryani", "230.0", "Dinner", "Non-Veg", "Chicken"},
            {"Ulavacharu Chicken Biryani", "240.0", "Dinner", "Non-Veg", "Chicken"},
            {"Andhra Chicken Fry Piece Biryani", "230.0", "Dinner", "Non-Veg", "Chicken"},
            {"Hyderabadi Mutton Biryani", "280.0", "Dinner", "Non-Veg", "Mutton"},
            {"Gongura Mutton Biryani", "295.0", "Dinner", "Non-Veg", "Mutton"},
            {"Ulavacharu Mutton Biryani", "310.0", "Dinner", "Non-Veg", "Mutton"},
            {"Andhra Mutton Fry Piece Biryani", "295.0", "Dinner", "Non-Veg", "Mutton"},
            {"Egg Biryani", "160.0", "Dinner", "Non-Veg", "Egg"},
            {"Prawn Biryani", "260.0", "Dinner", "Non-Veg", "Prawns"},
            {"Fish Biryani", "250.0", "Dinner", "Non-Veg", "Fish"},

            // Pachadis & Chutneys & Podis (Items 76 to 100)
            {"Gongura Pachadi", "40.0", "Pachadi", "Veg", "Vegan"},
            {"Tomato Pachadi", "35.0", "Pachadi", "Veg", "Vegan"},
            {"Dondakaya Pachadi", "35.0", "Pachadi", "Veg", "Vegan"},
            {"Kobbari Pachadi", "40.0", "Pachadi", "Veg", "Vegan"},
            {"Allam Pachadi", "40.0", "Pachadi", "Veg", "Vegan"},
            {"Dosakaya Pachadi", "35.0", "Pachadi", "Veg", "Vegan"},
            {"Beerakaya Thokku Pachadi", "40.0", "Pachadi", "Veg", "Vegan"},
            {"Avakaya Uragaya", "45.0", "Pachadi", "Veg", "Vegan"},
            {"Bellam Avakaya", "45.0", "Pachadi", "Veg", "Vegan"},
            {"Maagai Uragaya", "45.0", "Pachadi", "Veg", "Vegan"},
            {"Pandu Mirapakaya Pachadi", "40.0", "Pachadi", "Veg", "Vegan"},
            {"Usirikaya Pachadi", "40.0", "Pachadi", "Veg", "Vegan"},
            {"Chintakaya Pachadi", "40.0", "Pachadi", "Veg", "Vegan"},
            {"Nalla Karam Podi", "30.0", "Pachadi", "Veg", "Vegan"},
            {"Kandi Podi", "35.0", "Pachadi", "Veg", "Vegan"},
            {"Karivepaku Podi", "35.0", "Pachadi", "Veg", "Vegan"},
            {"Kakarakaya Podi", "40.0", "Pachadi", "Veg", "Vegan"},
            {"Putnala Podi", "30.0", "Pachadi", "Veg", "Vegan"},
            {"Ghee Podi Rice Bowl", "90.0", "Pachadi", "Veg", "Pure-Veg"},
            {"Curd Rice (Daddojanam)", "80.0", "Pachadi", "Veg", "Pure-Veg"},
            {"Lemon Rice (Pulihora)", "80.0", "Pachadi", "Veg", "Vegan"},
            {"Tamarind Pulihora", "85.0", "Pachadi", "Veg", "Vegan"},
            {"Gongura Rice", "90.0", "Pachadi", "Veg", "Vegan"},
            {"Mango Pulihora", "90.0", "Pachadi", "Veg", "Vegan"},
            {"Coconut Rice", "95.0", "Pachadi", "Veg", "Vegan"},

            // Snacks & Pindi Vantalu (Items 101 to 125)
            {"Mirchi Bajji", "45.0", "Snacks", "Veg", "Vegan"},
            {"Punugulu", "40.0", "Snacks", "Veg", "Vegan"},
            {"Mysore Bonda", "50.0", "Snacks", "Veg", "Pure-Veg"},
            {"Challa Punugulu", "45.0", "Snacks", "Veg", "Pure-Veg"},
            {"Onion Pakodi", "40.0", "Snacks", "Veg", "Vegan"},
            {"Garijalu", "50.0", "Snacks", "Veg", "Vegan"},
            {"Chegodi", "35.0", "Snacks", "Veg", "Vegan"},
            {"Janthikalu", "35.0", "Snacks", "Veg", "Vegan"},
            {"Murukulu", "35.0", "Snacks", "Veg", "Vegan"},
            {"Sakinalu", "40.0", "Snacks", "Veg", "Vegan"},
            {"Poha Mixture", "30.0", "Snacks", "Veg", "Vegan"},
            {"Masala Vada", "45.0", "Snacks", "Veg", "Vegan"},
            {"Sweet Corn Vadalu", "55.0", "Snacks", "Veg", "Vegan"},
            {"Aloo Samosa", "35.0", "Snacks", "Veg", "Vegan"},
            {"Veg Cutlet", "50.0", "Snacks", "Veg", "Vegan"},
            {"Spring Rolls (AP style)", "70.0", "Snacks", "Veg", "Vegan"},
            {"Onion Bajji", "40.0", "Snacks", "Veg", "Vegan"},
            {"Aloo Bajji", "40.0", "Snacks", "Veg", "Vegan"},
            {"Aratikaaya Bajji", "45.0", "Snacks", "Veg", "Vegan"},
            {"Tomato Bajji", "50.0", "Snacks", "Veg", "Vegan"},
            {"Chicken Pakodi", "110.0", "Snacks", "Non-Veg", "Chicken"},
            {"Egg Bonda", "70.0", "Snacks", "Non-Veg", "Egg"},
            {"Fish Finger (AP style)", "140.0", "Snacks", "Non-Veg", "Fish"},
            {"Chicken Keema Samosa", "80.0", "Snacks", "Non-Veg", "Chicken"},
            {"Prawn Fry (Snack)", "160.0", "Snacks", "Non-Veg", "Prawns"},

            // Drinks & Beverages (Items 126 to 138)
            {"South Indian Filter Kaapi", "40.0", "Drinks", "Veg", "Dairy-Based"},
            {"Bellam Paanakam", "35.0", "Drinks", "Veg", "Vegan"},
            {"Spiced Majjiga (Buttermilk)", "35.0", "Drinks", "Veg", "Dairy-Based"},
            {"Nannari Sharbat", "45.0", "Drinks", "Veg", "Vegan"},
            {"Sugandhi Soda", "40.0", "Drinks", "Veg", "Vegan"},
            {"Badam Milk (Cold)", "60.0", "Drinks", "Veg", "Dairy-Based"},
            {"Ragi Ambali", "45.0", "Drinks", "Veg", "Vegan"},
            {"Coconut Water", "40.0", "Drinks", "Veg", "Vegan"},
            {"Lemon Soda", "35.0", "Drinks", "Veg", "Vegan"},
            {"Mango Lassi", "70.0", "Drinks", "Veg", "Dairy-Based"},
            {"Rose Milk", "55.0", "Drinks", "Veg", "Dairy-Based"},
            {"Masala Tea", "30.0", "Drinks", "Veg", "Dairy-Based"},
            {"Ginger Tea", "30.0", "Drinks", "Veg", "Dairy-Based"},

            // Sweets & Desserts (Items 139 to 150)
            {"Atreyapuram Bellam Pootharekulu", "40.0", "Sweets", "Veg", "Bellam"},
            {"Kakinada Gottam Kaja", "30.0", "Sweets", "Veg", "Ghee"},
            {"Tapeswaram Madatha Kaja", "35.0", "Sweets", "Veg", "Ghee"},
            {"Andhra Bobbatlu", "60.0", "Sweets", "Veg", "Chana Dal"},
            {"Nethi Ariselu", "50.0", "Sweets", "Veg", "Ghee"},
            {"Bellam Sunnundalu", "45.0", "Sweets", "Veg", "Urad Dal"},
            {"Poornalu / Boorelu", "40.0", "Sweets", "Veg", "Traditional"},
            {"Madugula Halwa", "70.0", "Sweets", "Veg", "Wheat"},
            {"Ghee Mysore Pak", "80.0", "Sweets", "Veg", "Ghee"},
            {"Rava Kesari", "60.0", "Sweets", "Veg", "Semolina"},
            {"Paramannam Payasam", "75.0", "Sweets", "Veg", "Rice-Milk"},
            {"Elaneer Payasam", "90.0", "Sweets", "Veg", "Coconut-Milk"}
        };

        // Populate all 150 items into the single Hotel Pullamma
        for (int i = 0; i < itemData.length; i++) {
            String[] raw = itemData[i];
            String name = raw[0];
            double price = Double.parseDouble(raw[1]);
            String category = raw[2];
            boolean isVeg = raw[3].equals("Veg");
            String detail = raw[4];

            Menuitems item;
            if (isVeg) {
                item = new Vegitems(name, price, category, detail);
            } else {
                item = new NonVegitems(name, price, category, detail);
            }
            pullamma.addMenuItem(item);
        }

        restaurants.add(pullamma);
    }

    // --- Static File Handler ---
    static class StaticFileHandler implements HttpHandler {
        private final String filepath;
        private final String contentType;

        public StaticFileHandler(String filepath, String contentType) {
            this.filepath = filepath;
            this.contentType = contentType;
        }

        @Override
        public void handle(HttpExchange exchange) throws IOException {
            File file = new File(filepath);
            if (!file.exists()) {
                String response = "File Not Found: " + filepath;
                exchange.sendResponseHeaders(404, response.length());
                OutputStream os = exchange.getResponseBody();
                os.write(response.getBytes());
                os.close();
                return;
            }

            exchange.getResponseHeaders().set("Content-Type", contentType + "; charset=utf-8");
            byte[] bytes = Files.readAllBytes(Paths.get(filepath));
            exchange.sendResponseHeaders(200, bytes.length);
            OutputStream os = exchange.getResponseBody();
            os.write(bytes);
            os.close();
        }
    }

    // --- API Handlers ---
    
    // GET /api/restaurants
    static class RestaurantApiHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            if (!exchange.getRequestMethod().equalsIgnoreCase("GET")) {
                sendError(exchange, 405, "Method Not Allowed");
                return;
            }

            StringBuilder sb = new StringBuilder();
            sb.append("[");
            for (int i = 0; i < restaurants.size(); i++) {
                Res restaurant = restaurants.get(i);
                sb.append("{");
                sb.append("\"name\":\"").append(restaurant.getname()).append("\",");
                sb.append("\"address\":\"").append(restaurant.getaddress()).append("\",");
                sb.append("\"status\":\"").append(restaurant.getstatus()).append("\",");
                sb.append("\"menu\":[");
                ArrayList<Menuitems> items = restaurant.getmenuitems();
                for (int j = 0; j < items.size(); j++) {
                    Menuitems item = items.get(j);
                    sb.append("{");
                    sb.append("\"name\":\"").append(item.getname()).append("\",");
                    sb.append("\"price\":").append(item.getprice()).append(",");
                    sb.append("\"category\":\"").append(item.getcategory()).append("\",");
                    sb.append("\"totalOrders\":").append(item.gettotalorders()).append(",");
                    sb.append("\"type\":\"").append(item instanceof Vegitems ? "Veg" : "Non-Veg").append("\",");
                    if (item instanceof Vegitems) {
                        sb.append("\"subType\":\"").append(((Vegitems) item).getvegType()).append("\"");
                    } else {
                        sb.append("\"subType\":\"").append(((NonVegitems) item).getproteinSource()).append("\"");
                    }
                    sb.append("}");
                    if (j < items.size() - 1) sb.append(",");
                }
                sb.append("]");
                sb.append("}");
                if (i < restaurants.size() - 1) sb.append(",");
            }
            sb.append("]");

            sendJson(exchange, sb.toString());
        }
    }

    // GET /api/orders or POST /api/orders
    static class OrderApiHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            String method = exchange.getRequestMethod();
            
            if (method.equalsIgnoreCase("GET")) {
                StringBuilder sb = new StringBuilder();
                sb.append("[");
                for (int i = 0; i < orders.size(); i++) {
                    sb.append(orders.get(i).toJson());
                    if (i < orders.size() - 1) sb.append(",");
                }
                sb.append("]");
                sendJson(exchange, sb.toString());
                
            } else if (method.equalsIgnoreCase("POST")) {
                InputStreamReader isr = new InputStreamReader(exchange.getRequestBody(), StandardCharsets.UTF_8);
                BufferedReader br = new BufferedReader(isr);
                StringBuilder body = new StringBuilder();
                String line;
                while ((line = br.readLine()) != null) {
                    body.append(line);
                }
                
                try {
                    String payload = body.toString();
                    String customerName = parseJsonStringField(payload, "customerName");
                    double discount = parseJsonDoubleField(payload, "discount");
                    ArrayList<String> itemNames = parseJsonArrayField(payload, "items");

                    if (customerName == null || customerName.trim().isEmpty() || itemNames.isEmpty()) {
                        sendError(exchange, 400, "Invalid Order Request Data");
                        return;
                    }

                    ArrayList<Menuitems> itemsToOrder = new ArrayList<>();
                    for (String name : itemNames) {
                        Menuitems item = findMenuItemByName(name);
                        if (item != null) {
                            itemsToOrder.add(item);
                        }
                    }

                    if (itemsToOrder.isEmpty()) {
                        sendError(exchange, 404, "None of the ordered items were found in menus.");
                        return;
                    }

                    Order newOrder = new Order(customerName, itemsToOrder, discount);
                    orders.add(newOrder);

                    System.out.println("[NEW ORDER] Pullamma Kitchen | Customer: " + newOrder.getcustomerName() + " | Order #" + newOrder.getorderNo() + " | Price: ₹" + newOrder.getfinalPrice());
                    
                    new Thread(() -> {
                        try {
                            Thread.sleep(1000);
                            newOrder.setstatus("Preparing");
                            System.out.println("[STATUS CHANGE] Order #" + newOrder.getorderNo() + " status: Preparing");
                            for (Menuitems item : newOrder.getmenuitems()) {
                                item.prepare();
                            }
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        }
                    }).start();

                    sendJson(exchange, newOrder.toJson());
                } catch (Exception e) {
                    sendError(exchange, 400, "Bad Request: " + e.getMessage());
                }
            } else {
                sendError(exchange, 405, "Method Not Allowed");
            }
        }
    }

    // POST /api/orders/update
    static class UpdateOrderApiHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            if (!exchange.getRequestMethod().equalsIgnoreCase("POST")) {
                sendError(exchange, 405, "Method Not Allowed");
                return;
            }

            InputStreamReader isr = new InputStreamReader(exchange.getRequestBody(), StandardCharsets.UTF_8);
            BufferedReader br = new BufferedReader(isr);
            StringBuilder body = new StringBuilder();
            String line;
            while ((line = br.readLine()) != null) {
                body.append(line);
            }

            try {
                String payload = body.toString();
                int orderNo = (int) parseJsonDoubleField(payload, "orderNo");
                String nextStatus = parseJsonStringField(payload, "status");

                Order found = null;
                for (Order order : orders) {
                    if (order.getorderNo() == orderNo) {
                        found = order;
                        break;
                    }
                }

                if (found == null) {
                    sendError(exchange, 404, "Order not found");
                    return;
                }

                if (nextStatus != null && !nextStatus.isEmpty()) {
                    found.setstatus(nextStatus);
                } else {
                    String current = found.getstatus();
                    if (current.equals("Pending")) {
                        found.setstatus("Preparing");
                    } else if (current.equals("Preparing")) {
                        found.setstatus("Ready");
                    } else if (current.equals("Ready")) {
                        found.setstatus("Delivered");
                    }
                }

                System.out.println("[STATUS CHANGE] Order #" + found.getorderNo() + " advanced to: " + found.getstatus());
                sendJson(exchange, found.toJson());
            } catch (Exception e) {
                sendError(exchange, 400, "Bad Request: " + e.getMessage());
            }
        }
    }

    // GET /api/stats
    static class StatsApiHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            if (!exchange.getRequestMethod().equalsIgnoreCase("GET")) {
                sendError(exchange, 405, "Method Not Allowed");
                return;
            }

            double totalRevenue = 0.0;
            int totalOrderCount = orders.size();
            Map<String, Integer> itemSales = new HashMap<>();

            for (Order o : orders) {
                if (!o.getstatus().equals("Cancelled")) {
                    totalRevenue += o.getfinalPrice();
                }
                for (Menuitems item : o.getmenuitems()) {
                    itemSales.put(item.getname(), itemSales.getOrDefault(item.getname(), 0) + 1);
                }
            }

            String topItem = "N/A";
            int topSales = 0;
            for (Map.Entry<String, Integer> entry : itemSales.entrySet()) {
                if (entry.getValue() > topSales) {
                    topSales = entry.getValue();
                    topItem = entry.getKey();
                }
            }

            StringBuilder sb = new StringBuilder();
            sb.append("{");
            sb.append("\"totalRevenue\":").append(Math.round(totalRevenue * 100.0) / 100.0).append(",");
            sb.append("\"totalOrders\":").append(totalOrderCount).append(",");
            sb.append("\"topSellingItem\":\"").append(topItem.replace("\"", "\\\"")).append("\",");
            sb.append("\"topSellingCount\":").append(topSales);
            sb.append("}");

            sendJson(exchange, sb.toString());
        }
    }

    // --- Helpers ---
    
    private static Menuitems findMenuItemByName(String name) {
        for (Res r : restaurants) {
            for (Menuitems item : r.getmenuitems()) {
                if (item.getname().equalsIgnoreCase(name)) {
                    return item;
                }
            }
        }
        return null;
    }

    private static void sendJson(HttpExchange exchange, String json) throws IOException {
        byte[] bytes = json.getBytes(StandardCharsets.UTF_8);
        exchange.getResponseHeaders().set("Content-Type", "application/json; charset=utf-8");
        exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
        exchange.sendResponseHeaders(200, bytes.length);
        OutputStream os = exchange.getResponseBody();
        os.write(bytes);
        os.close();
    }

    private static void sendError(HttpExchange exchange, int code, String message) throws IOException {
        String json = "{\"error\":\"" + message + "\"}";
        byte[] bytes = json.getBytes(StandardCharsets.UTF_8);
        exchange.getResponseHeaders().set("Content-Type", "application/json; charset=utf-8");
        exchange.sendResponseHeaders(code, bytes.length);
        OutputStream os = exchange.getResponseBody();
        os.write(bytes);
        os.close();
    }

    private static String parseJsonStringField(String json, String field) {
        String key = "\"" + field + "\"";
        int index = json.indexOf(key);
        if (index == -1) return null;
        int colonIndex = json.indexOf(":", index);
        int quoteStart = json.indexOf("\"", colonIndex);
        if (quoteStart == -1) return null;
        int quoteEnd = json.indexOf("\"", quoteStart + 1);
        if (quoteEnd == -1) return null;
        return json.substring(quoteStart + 1, quoteEnd);
    }

    private static double parseJsonDoubleField(String json, String field) {
        String key = "\"" + field + "\"";
        int index = json.indexOf(key);
        if (index == -1) return 0.0;
        int colonIndex = json.indexOf(":", index);
        
        int endIndex = json.length();
        for (int i = colonIndex + 1; i < json.length(); i++) {
            char c = json.charAt(i);
            if (c == ',' || c == '}' || c == ']' || Character.isWhitespace(c)) {
                endIndex = i;
                break;
            }
        }
        String valStr = json.substring(colonIndex + 1, endIndex).trim();
        try {
            return Double.parseDouble(valStr);
        } catch (NumberFormatException e) {
            return 0.0;
        }
    }

    private static ArrayList<String> parseJsonArrayField(String json, String field) {
        ArrayList<String> result = new ArrayList<>();
        String key = "\"" + field + "\"";
        int index = json.indexOf(key);
        if (index == -1) return result;
        int arrayStart = json.indexOf("[", index);
        int arrayEnd = json.indexOf("]", arrayStart);
        if (arrayStart == -1 || arrayEnd == -1) return result;

        String arrayContent = json.substring(arrayStart + 1, arrayEnd);
        String[] items = arrayContent.split(",");
        for (String item : items) {
            String trimmed = item.trim();
            if (trimmed.startsWith("\"") && trimmed.endsWith("\"")) {
                result.add(trimmed.substring(1, trimmed.length() - 1));
            } else {
                result.add(trimmed);
            }
        }
        return result;
    }
}
