Feature: Buy T-Shirt feature
  
  Background: Navigate to the shopping page
    Given the user navigates to the shopping page
  
  Scenario: Add and buy T-Shirt
    When the user navigates to the TShirt option in the categories menu
    * the user selects the product to buy
    * the user proceed to checkout "aperdomobo@gmail.com" "WorkshopProtractor"
    * the user navigates to shipping card page
    * the user goes to payment
    Then the user is able to pay the product
