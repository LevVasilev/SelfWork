import javax.mail.*;
import javax.mail.internet.*;
import java.util.Properties;


public class EmailSender {

    public static void sendEmail(String toEmail, String subject, String body) {
        // Данные отправителя
        final String fromEmail = "selfwork@gmail.com";  
        final String password = "x";            

        // SMTP настройки
        Properties props = new Properties();
        props.put("mail.smtp.host", "smtp.gmail.com");   
        props.put("mail.smtp.port", "587");                 
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");

        // Авторизация
        Session session = Session.getInstance(props, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(fromEmail, password);
            }
        });

        try {
            // Создание сообщения
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(fromEmail));
            message.setRecipients(
                    Message.RecipientType.TO, InternetAddress.parse(toEmail));
            message.setSubject(subject);
            message.setText(body);

            // Отправка письма
            Transport.send(message);

            System.out.println("Email успешно отправлен!");
        } catch (MessagingException e) {
            System.out.println("Ошибка при отправке email:");
            e.printStackTrace();
        }
    }


        );
    }
}
