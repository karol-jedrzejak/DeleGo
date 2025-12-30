import { useState,useEffect,useContext } from "react";
import { MessageContext } from "@/providers/MessageProvider.js";

// Komponenty UI //

import { Copy,Phone,Mail } from "lucide-react";
import { Card, Loading, Button , Select, Input, Error} from '@/components';

// Model //

import type { ItemType,ItemsType } from "@/models/User";

// API //

import { useBackend } from '@/hooks/useLaravelBackend';
import { userService } from "@/api/services/backend/user/user.service";

const UserPermission = () => {

  // -------------------------------------------------------------------------- //
  // Inicjalizacja zmiennych
  // -------------------------------------------------------------------------- //
  
  const { setMessage } = useContext(MessageContext);

  const [items, setItems] = useState<ItemsType | null>(null);
  const [item, setItem] = useState<ItemType | null>(null);

  // -------------------------------------------------------------------------- //
  // Get
  // -------------------------------------------------------------------------- //

  const { loading:loadingGet, error:errorGet, mutate:mutateGet } = useBackend<ItemsType>("get", userService.paths.getAll);

  useEffect(() => {
      mutateGet()
      .then((res) => {
          setItems(res.data);
          setItem(res.data[0]);
      })
      .catch(() => {});
  }, []);

  // -------------------------------------------------------------------------- //
  // Update
  // -------------------------------------------------------------------------- //

  const { loading: loadingPut, error:errorPut, mutate:mutatePut } = useBackend("put", userService.paths.update);

  const handleUpdate = async () => {
      try {
          await mutatePut({data: item});
      } catch {}
  };

  // -------------------------------------------------------------------------- //
  // Handle Change
  // -------------------------------------------------------------------------- //

  const handleChangeUser = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
      ) => {
      const { value } = e.target;
      let found = items?.find(item => item.id == Number(value));
      setItem(found ?? null)
  };

  const handleChange = (
      e: React.ChangeEvent<HTMLInputElement>
      ) => {
      const { name, value } = e.target;

      if (!item) return;
      let new_item: ItemType = {...item};
      let department = name.split(".")[0];
      let resource = name.split(".")[1];
      
      if (new_item.permissions) {
        new_item.permissions[department][resource] = value;
      }

      setItem(new_item);
  };

  // -------------------------------------------------------------------------- //
  // Kopiowanie do schowka
  // -------------------------------------------------------------------------- //

    async function copyDataToClipboard() {
      try {
        const lines: string[] = [];
        if(item)
        {
          if (item.position) lines.push(item.position);
          lines.push("Szanowny/a Pan/Pani");

          const fullName = [
              item.academic_titles_before?.trim(),
              item.name,
              item.surname,
              item.academic_titles_after?.trim(),
          ].join(" ");

          lines.push(fullName);
          if (item.email) lines.push(`E-mail: ${item.email}`);
          if (item.phone_mobile) lines.push(`Kom: ${item.phone_mobile}`);
          if (item.phone_landline) lines.push(`Tel: ${item.phone_landline}`);
        }
        await navigator.clipboard.writeText(lines.join("\n"));
        setMessage({status: "success", text: "Skopiowano tekst do schowka."})
      } catch (err) {
        setMessage({status: "error", text: "Błąd kopiowania tekstu do schowka"})
      }
    }

  // -------------------------------------------------------------------------- //
  // Wyświetlanie błędu i Loading
  // -------------------------------------------------------------------------- //

  if(loadingGet || loadingPut) { return <Loading/>; }
  if(errorGet || errorPut) { return <Error><Error.Text>Błąd</Error.Text></Error> }

  // -------------------------------------------------------------------------- //
  // Renderowanie danych
  // -------------------------------------------------------------------------- //

  return (
    <div className="flex justify-center">
      <Card>
        <Card.Header>
          Zmiana uprawnień Userów
        </Card.Header>
        <Card.Body>
          {items &&
            <div>
              <Select
                  label="Wybierz usera:"   
                  name="active"
                  classNameInput="w-full"
                  onChange={handleChangeUser}
                  defaultValue={item?.id}
                  >
                    {items.map( (item_selection,key) => (  
                      <option key={key} value={item_selection.id}
                      >{item_selection.name} {item_selection.surname} [id={item_selection.id}]</option>
                    ))}
              </Select>
              {item && (
                <>
                <div className="flex justify-center items-center">
                  <table className="w-1/2">
                    <thead>
                      <tr >
                        <th className="p-2">Nazwa</th>
                        <th className="p-2">Wartość</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="custom-table-row">
                        <td className="p-2">Użytkownik:</td>
                        <td className="p-2">{item.academic_titles_before} {item.name} {item.surname} {item.academic_titles_after}</td>
                      </tr>
                      <tr className="custom-table-row">
                        <td className="p-2">Stanowisko:</td>
                        <td className="p-2">{item.position}</td>
                      </tr>
                      <tr className="custom-table-row">
                        <td className="p-2">E-mail:</td>
                        <td className="p-2">
                          <Button
                          onClick={() => {window.location.href = "mailto:"+item.email+"?subject=Temat";}}
                          size={1} color="teal" className="flex flex-row items-center"
                          >
                              <Mail size={16}/>
                              <div className="ps-1">{item.email}</div>
                          </Button></td>
                      </tr>
                      <tr className="custom-table-row">
                        <td className="p-2">Telefon Stacjonarny:</td>
                        <td className="p-2">
                          <Button
                          onClick={() => {window.location.href = "tel:"+item.phone_landline;}}
                          size={1} color="lime" className="flex flex-row items-center"
                          >
                              <Phone size={16}/>
                              <div className="ps-1">{item.phone_landline}</div>
                              
                          </Button>
                        </td>
                      </tr>
                      <tr className="custom-table-row">
                        <td className="p-2">Telefon Komórkowy:</td>
                        <td className="p-2">
                          <Button
                          onClick={() => {window.location.href = "tel:"+item.phone_mobile;}}
                          size={1} color="lime" className="flex flex-row items-center"
                          >
                              <Phone size={16}/>
                              <div className="ps-1">{item.phone_mobile}</div>
                              
                          </Button>
                        </td>
                      </tr>
                      <tr className="custom-table-row">
                        <td className="p-2">Skopiuj Dane:</td>
                        <td className="p-2">
                          <Button
                          color="purple" size={2}
                          className="flex flex-row items-center"
                          onClick={() => copyDataToClipboard()}
                          >
                                  <Copy size={18}/>
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="flex flex-row gap-4 flex-wrap justify-center">
                  {item.permissions && Object.entries(item.permissions).map(([department, resources],key) => (
                    <div key={key}>
                      { department != "admin" &&
                        <div>
                          <div className="text-xl border-b text-sky-800 border-sky-800 dark:text-sky-500 dark:border-sky-500 py-2 font-semibold">{department}</div>
                          <ul>
                            {Object.entries(resources).map(([resource, level],key) => (
                              <li key={key}>
                                <Input
                                    label={`${resource}:`}  
                                    type = "number"
                                    name={department+"."+resource}
                                    value={level}
                                    onChange={handleChange}
                                    classNameInput='w-full'
                                    classNameLabel="w-[200px]"
                                    classNameContainer="w-full"
                                    min={0}
                                    max={9}
                                    step={1}
                                    linear
                                ></Input>
                              </li>
                            ))}
                          </ul>
                        </div>
                      }
                    </div>
                  ))}

                </div>
                <div className="w-full flex items-center justify-center pt-4">
                  <Button onClick={() => handleUpdate()}>Aktualizuj</Button>
                </div>
                </>
              )}
            </div>
          }
        </Card.Body>
      </Card>
    </div>
  );
};

export default UserPermission;