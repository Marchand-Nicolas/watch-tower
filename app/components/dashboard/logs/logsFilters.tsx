import styles from "@/app/styles/components/dashboard/logs.module.css";
import { useRouter } from "next/navigation";
import CheckboxItem from "../../UI/checkboxItem";
import IconRouter from "../../icons/iconRouter";
import SolidIcon from "../../icons/solidIcon";
import { useEffect } from "react";

const LogsFilters = ({
  services,
  targetServiceIds,
  setRefresh,
  types,
  targetTypes,
  setTargetTypes,
}: {
  services: Array<Service>;
  targetServiceIds: Array<string>;
  setRefresh: (refresh: boolean) => void;
  types: Array<Type>;
  targetTypes: Array<Type>;
  setTargetTypes: (targetTypes: Array<Type>) => void;
}) => {
  const router = useRouter();

  const setSearchParams = (key: string, value: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set(key, value);
    router.push(`${window.location.pathname}?${params.toString()}`);
    setRefresh(true);
  };

  useEffect(() => {
    for (let index = 0; index < types.length; index++) {
      const type = types[index];
      if (targetTypes.includes(type)) {
        for (let index = 0; index < type.parents.length; index++) {
          const parentId = type.parents[index];
          const parent = types.find((t) => t._id === parentId);
          if (!parent) continue;
          if (!targetTypes.includes(parent)) {
            setTargetTypes(targetTypes.filter((t) => t._id !== type._id));
          }
        }
      }
    }
  }, [types, targetTypes]);

  const TypeFilter = ({ type }: { type: Type }) => {
    return (
      <>
        <div className={styles.type}>
          <CheckboxItem
            name={type.name}
            checked={targetTypes.includes(type)}
            onChange={(e) => {
              const checked = e.target.checked;
              if (checked) {
                targetTypes.push(type);
              } else {
                targetTypes.splice(targetTypes.indexOf(type), 1);
              }
              setSearchParams(
                "types",
                targetTypes.map((type) => type._id).join(",")
              );
            }}
            icon={
              <div className="mr-1">
                <SolidIcon width={20}>
                  <IconRouter name={type.icon} />
                </SolidIcon>
              </div>
            }
          />
        </div>
        {targetTypes.includes(type) && (
          <div className={styles.subtypes}>
            {types
              .filter((t) => t.parents.includes(type._id))
              .map((subtype) => (
                <div
                  className={styles.item}
                  key={`type_filter_${subtype.name}`}
                >
                  <TypeFilter type={subtype} />
                </div>
              ))}
          </div>
        )}
      </>
    );
  };

  return (
    <div className={styles.filters}>
      <div className={styles.category}>
        {services.map((service) => (
          <div className={styles.item} key={`service_filter_${service._id}`}>
            <CheckboxItem
              name={service.app_name}
              checked={targetServiceIds.includes(service._id)}
              onChange={(e) => {
                const checked = e.target.checked;
                if (checked) {
                  targetServiceIds.push(service._id);
                } else {
                  targetServiceIds.splice(
                    targetServiceIds.indexOf(service._id),
                    1
                  );
                }
                setSearchParams("services", targetServiceIds.join(","));
              }}
            />
          </div>
        ))}
      </div>
      <div className={styles.category}>
        {types
          .filter((t) => t.parents.length === 0)
          .map((type) => (
            <div
              className={[styles.item, styles.typeContainer].join(" ")}
              key={`type_filter_${type.name}`}
            >
              <TypeFilter type={type} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default LogsFilters;
