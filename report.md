# Отчёт к лабораторной работе №2
#### На тему "Поиск в пространстве состояний"
#### Выполнил Хитёв Владислав

## Постановка задачи
Необходимо решить игру "пятнашки" размера 3 на 3 клеток с помощью алгоритма неинформативного поиска BFS и алгоритма информативного поиска A*.

## Формулировка проблемы и описание пространства состояний
Пространство событий предствялет собой матрицу 3 на 3, содержащую 8 чисел от 1 до 8 и одну пустую клетку (*).

Решенная задача имеет следующий вид:
1 строка - 1 2 3
2 строка - 4 5 6
3 стркоа - 7 8 *

Переход от одного состояния к другому происходит путём обмена пустой ячейки с одной из соседних (то есть у родительского состояния может быть от 1 до 4 потомков).

Начальное состояние - случайная комбинация плиток.
Функция определения преемника - {[
  Поменять пустую ячейку с ячейкой сверху *,
  Поменять пустую ячейку с ячейкой снизу *,
  Поменять пустую ячейку с ячейкой слева *,
  Поменять пустую ячейку с ячейкой справа *
]}
при условии, что такая ячейка существует.

В результате выполнения алгоритмов получаем путь в пространстве состояний - минимальную последовательность перемещений плиток, которая приводит к оптимальному решению.

## Описание эвристической функции оценки
Использованы три эвристические функции оценки:
- Расстояние Хэмминга
- Манхеттенское расстояние
- Манхеттенское расстояние с учётом линейных конфликтов

Все эвристические функции являются допустимыми (admissible), поскольку они не переоценивают фактическую минимальную стоимость достижения цели.

Стоимость решения ослабленной задачи (где в одной клетке могут находиться несколько плиток) является допустимой эвристикой для первоначальной задачи, так как любое решение первоначальной задачи является также решением ослабленной задачи.

Допустимая эвристика может быть основана на стоимости решения подзадачи исходной задачи. Любое решение основной задачи одновременно является решением каждой из её подзадач. Подзадачей задачи решения головоломки «Пятнашки» может быть задача перемещения на свои места плиток 1, 2, 3 и 4. Стоимость решения этой подзадачи является допустимой эвристикой для исходной задачи.

## Анализ алгоритмов решения
Поисковые стратегии -
1. Полнота - всегда ли будет найдено решение, если оно существует?
2. Оптимальность - всегда ли находится оптимальное решение?
3. Временная сложность - за какое время алгоритм находит решение?
4. Пространственная сложность - какой объем памяти необходим для выполнения поиска.

Свойства алгоритмов:

| Алгоритм | Полнота | Оптимальность | Время | Объём памяти |
| BFS | Да, если b конечно | Да | O(b^(d+1)) | O(b^(d+1)) |
| A* | Да | Да | Экспоненциально зависит от длины решения | Сохраняет все узлы в памяти |

d - глубина наиболее поверхностного целевого узла
b - максимальный фактор разветвлённости в дереве
m - максимальная длина любого из путей в пространстве состояний

## Результаты проведения серии экспериментов
Алгоритм BFS
![Summary row clicked](./screenshots/report/1.PNG)

Алгоритм A* с эвристикой - расстоянием Хэмминга
![Summary row clicked](./screenshots/report/2.PNG)

Алгоритм A* с эвристикой - манхеттенским расстоянием
![Summary row clicked](./screenshots/report/3.PNG)

Алгоритм A* с эвристикой - манхеттенским расстоянием с учётом линейных конфликтов
![Summary row clicked](./screenshots/report/4.PNG)

## Анализ полученных результатов
Сравнивая скорости нахождения оптимального решения, делаем вывод, что алгоритм информативного поиска A* находит такое решение намного быстрее алгоритма неинформативного поиска BFS.

Если же сравнивать эвристики при решении A*, то манхеттенское расстояние намного лучше расстояния Хэмминга.