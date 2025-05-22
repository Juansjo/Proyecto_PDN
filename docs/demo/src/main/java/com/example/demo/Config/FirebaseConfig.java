package com.example.demo.Config;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.context.annotation.Configuration;
import javax.annotation.PostConstruct;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.IOException;
import org.springframework.core.io.ClassPathResource;


@Configuration

public class FirebaseConfig {

        @PostConstruct
        public void initialize() throws IOException {
            InputStream serviceAccount = new ClassPathResource("proyecto-pd-a24a1-firebase-adminsdk-fbsvc-913b7ab712.json").getInputStream();

            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .build();

            FirebaseApp.initializeApp(options);

        }
    }
