FROM openjdk:17-jdk

WORKDIR /app

COPY target/library-management-0.0.1-SNAPSHOT.jar /app/library-management.jar

EXPOSE 8080

CMD ["java", "-jar", "library-management.jar"]