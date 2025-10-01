console.clear();

// Clear the cart cookies after placing the order by setting their expiry date to the past
document.cookie = "orderId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
document.cookie = "counter=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

// Update the badge in the header to 0
if(document.cookie.indexOf(',counter=') < 0) {
    // Check if the badge element exists before trying to update it
    const badge = document.getElementById("badge");
    if (badge) {
        badge.innerHTML = '0';
    }
}