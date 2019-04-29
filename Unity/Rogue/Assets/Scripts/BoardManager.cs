using UnityEngine;
using System;
using System.Collections.Generic;       //Allows us to use Lists.
using Random = UnityEngine.Random;      //Tells Random to use the Unity Engine random number generator.

public class BoardManager : MonoBehaviour
{
    // Using Serializable allows us to embed a class with sub properties in the inspector.
    [Serializable]
    public class Count
    {
        public int minimum;             //Minimum value for our Count class.
        public int maximum;             //Maximum value for our Count class.


        //Assignment constructor.
        public Count(int min, int max)
        {
            minimum = min;
            maximum = max;
        }
    }


    public int columns = 8;                                         //Number of columns in our game board.
    public int rows = 8;                                            //Number of rows in our game board.
    public Count wallCount = new Count(5, 9);                      //Lower and upper limit for our random number of walls per level.
    public Count foodCount = new Count(1, 5);                      //Lower and upper limit for our random number of food items per level.
    public GameObject exit;                                         //Prefab to spawn for exit.
    public GameObject[] floorTiles;                                 //Array of floor prefabs.
    public GameObject[] wallTiles;                                  //Array of wall prefabs.
    public GameObject[] foodTiles;                                  //Array of food prefabs.
    public GameObject[] enemyTiles;                                 //Array of enemy prefabs.
    public GameObject[] outerWallTiles;                             //Array of outer tile prefabs.

    private Transform boardHolder;                                  //A variable to store a reference to the transform of our Board object.
    private List<Vector3> gridPositions = new List<Vector3>();   //A list of possible locations to place tiles.


    //アイテム配置可能領域を初期化
    void InitialiseList()
    {
        //アイテム配置可能領域を初期化
        gridPositions.Clear();

        // 0+1から最大-1をループ(一番外枠には何も配置したくないため)
        for (int x = 1; x < columns - 1; x++)
        {
            // 0+1から最大-1をループ(一番外枠には何も配置したくないため)
            for (int y = 1; y < rows - 1; y++)
            {
                //アイテム配置可能領域を追加
                gridPositions.Add(new Vector3(x, y, 0f));
            }
        }
    }


    //床と外壁をセットアップ
    void BoardSetup()
    {
        //ボードの親を作成
        boardHolder = new GameObject("Board").transform;

        //-1から最大+1の領域を初期化(外壁を含むため)
        for (int x = -1; x < columns + 1; x++)
        {
            //-1から最大+1の領域を初期化(外壁を含むため)
            for (int y = -1; y < rows + 1; y++)
            {
                //ランダムなフロアを配置
                GameObject toInstantiate = floorTiles[Random.Range(0, floorTiles.Length)];

                //枠からはみ出していたら壁を配置
                if (x == -1 || x == columns || y == -1 || y == rows)
                    toInstantiate = outerWallTiles[Random.Range(0, outerWallTiles.Length)];

                //配置
                GameObject instance =
                    Instantiate(toInstantiate, new Vector3(x, y, 0f), Quaternion.identity) as GameObject;

                //親に紐づけ
                instance.transform.SetParent(boardHolder);
            }
        }
    }


    //アイテム配置可能領域の座標を取得し、既存のものを取り除く
    Vector3 RandomPosition()
    {
        int randomIndex = Random.Range(0, gridPositions.Count);
        Vector3 randomPosition = gridPositions[randomIndex];
        gridPositions.RemoveAt(randomIndex);
        return randomPosition;
    }


    //ランダムに配置する
    void LayoutObjectAtRandom(GameObject[] tileArray, int minimum, int maximum)
    {
        //アイテム配置可能領域のインデックスをランダムに作成
        int objectCount = Random.Range(minimum, maximum + 1);

        //アイテム配置可能領域の配列を置き換える
        for (int i = 0; i < objectCount; i++)
        {
            Vector3 randomPosition = RandomPosition();
            GameObject tileChoice = tileArray[Random.Range(0, tileArray.Length)];
            Instantiate(tileChoice, randomPosition, Quaternion.identity);
        }
    }


    //シーンを作成
    public void SetupScene(int level)
    {
        //外壁と床をセットアップ
        BoardSetup();

        //アイテム配置可能領域を初期化
        InitialiseList();

        //壁をランダム配置
        LayoutObjectAtRandom(wallTiles, wallCount.minimum, wallCount.maximum);

        //食べ物をランダム配置
        LayoutObjectAtRandom(foodTiles, foodCount.minimum, foodCount.maximum);

        //敵の数をレベルで設定
        int enemyCount = (int)Mathf.Log(level, 2f);

        //食べ物をランダム配置.
        LayoutObjectAtRandom(enemyTiles, enemyCount, enemyCount);

        //出口を配置
        Instantiate(exit, new Vector3(columns - 1, rows - 1, 0f), Quaternion.identity);
    }
}