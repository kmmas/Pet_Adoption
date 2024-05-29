package com.example.demo.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class RecoveryService {
    @Value("${spring.datasource.username}")
    private String username;
    @Value("${spring.datasource.password}")
    private String password;
    @Value("${mysql.exe.path}")
    private String mySqlPath;
    @Value("${mysqldump.exe.out}")
    private String outPath;

    public boolean backUp() throws InterruptedException, IOException {
        String[] command = new String[]{mySqlPath + "mysqldump.exe",
                                        "-u" + username,
                                        "-p" + password,
                                        "--add-drop-database",
                                        "--databases",
                                        "petadoption",
                                        "-r",
                                        outPath + "backup.sql"};
        Process runtimeProcess = Runtime.getRuntime().exec(command);
        int processComplete = runtimeProcess.waitFor();
        if (processComplete == 0) {
            System.out.println("Successfully restored from SQL : ");
        } else {
            System.out.println("n restored from SQL : ");
        }
        return processComplete == 0;
    }

    public void restore() throws InterruptedException, IOException {
        System.out.println(outPath);
        System.out.println(mySqlPath);
        String[] command = new String[]{"cmd.exe",
                                        "/c",
                                        mySqlPath + "mysql.exe",
                                        "-u" + username,
                                        "-p" + password,
                                        ">",
                                        outPath + "backup.sql"};
        Process runtimeProcess = new ProcessBuilder(command).start();
        int processComplete = runtimeProcess.waitFor();
        if (processComplete == 0) {
            System.out.println("Successfully restored from SQL : ");
        } else {
            System.out.println("n restored from SQL : ");
        }
    }
}
