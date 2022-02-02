const getRawDate = (inputDate) => {
    let tempDate = new Date(inputDate).toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      tempDate = tempDate.split("/").join("-")
      console.log(tempDate)
      return tempDate
}

export default getRawDate