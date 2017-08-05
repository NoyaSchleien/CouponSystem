package org.noya.Webapp;

import java.io.File;
import java.io.IOException;
import java.util.logging.FileHandler;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.logging.SimpleFormatter;

/**
 * This class creates and handles the logs and writes them in a file.
 */
public class MyLogger {

	static FileHandler fileTxt;
	static SimpleFormatter formatterTxt;
	static Logger logger = Logger.getLogger(MyLogger.class.getName());

	static public void logging(Level level, String msg) {
		logger.setLevel(Level.INFO);
		try {
			File file = new File("c:/logs/logs.txt");
			if (!file.exists()) {
				File directory = new File("c:/logs");
				if (!directory.exists()) {
					directory.mkdirs();
				}
				file = new File(directory, "logs.txt");
				file.createNewFile();
			}
			fileTxt = new FileHandler(file.getAbsolutePath());
		} catch (SecurityException | IOException e) {
		}
		formatterTxt = new SimpleFormatter();
		fileTxt.setFormatter(formatterTxt);
		logger.addHandler(fileTxt);
		logger.log(level, msg);

	}

}
