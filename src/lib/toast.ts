export function showNotification() {
	var notif : HTMLDivElement | null = document.querySelector(".toast-notification");
	//TODO: Mobile can't copy links
	if (!notif) {
		return;
	}
	
	notif.style.transform = "translateY(-5rem)";

	setTimeout(() => {
		if (notif) {
			notif.style.transform = "translateY(0)";
		}
	}, 2000);
}