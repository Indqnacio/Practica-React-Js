 //Si no le pasamos el {toast} no se muestra, importante mandar el parametro con el toast al final 
 export const showLoading = (e,toast) => {
    toast.current.show({
      severity: "info",
      summary: "Cargando datos ",
      life: 3000,
    });
  };

 export const showCorrectLoad = (toast) => {
    toast.current.show({
      severity: "success",
      summary: "Datos cargados correctamente",
      life: 3000,
    });
  };

 export const showError = (error,toast) => {
    toast.current.show({
      severity: "error",
      summary: "Error al cargar personajes: "+error,
    });
  };

 export const ShowAllMessage = (toast) => {
    toast.current.show({
      severity: "info",
      summary: "Se muestran todos los usuarios",
    });
  };