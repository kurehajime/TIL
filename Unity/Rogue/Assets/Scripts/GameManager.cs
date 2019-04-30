using UnityEngine;
using System.Collections;

using System.Collections.Generic;       //Allows us to use Lists. 

public class GameManager : MonoBehaviour
{
    public float turnDelay = .1f; 
    public static GameManager instance = null;              //Static instance of GameManager which allows it to be accessed by any other script.
    public int playerFoodPoints = 100;
    [HideInInspector] public bool playersTurn = true;

    private BoardManager boardScript;                       //Store a reference to our BoardManager which will set up the level.
    private int level = 3;                                  //Current level number, expressed in game as "Day 1".
    private List<Enemy> enemies;
    private bool enemiesMoving;


    //Awakeを定義して置くと起動時に呼び出される。overrideしなくて良いのはUnityの魔法
    void Awake()
    {
        //シングルトン
        if (instance == null)
        {
            instance = this;
        }
        else if (instance != this)
        {
            Destroy(gameObject);
        }
        //Unityではシーンを切り替えるとgameObjectが全部破棄されるが、これをやってると保持できる
        DontDestroyOnLoad(gameObject);

        //ボードスクリプトをセット
        boardScript = GetComponent<BoardManager>();

        //ゲームを初期化
        enemies = new List<Enemy>();
        InitGame();
    }

    //Initializes the game for each level.
    void InitGame()
    {
        enemies.Clear();
        //ボードスクリプトを呼び出す。
        boardScript.SetupScene(level);

    }

    public void GameOver()
    {
        enabled = false;
    }

    void Update()
    {
        if (playersTurn || enemiesMoving)
        {
            return;
        }

        StartCoroutine(MoveEnemies());
    }

    //敵追加
    public void AddEnemyToList(Enemy script)
    {
        enemies.Add(script);
    }

    //敵移動
    IEnumerator MoveEnemies()
    {
        enemiesMoving = true;
        yield return new WaitForSeconds(turnDelay);
        if (enemies.Count == 0)
        {
            yield return new WaitForSeconds(turnDelay);
        }
        for (int i = 0; i < enemies.Count; i++)
        {
            enemies[i].MoveEnemy();
            yield return new WaitForSeconds(enemies[i].moveTime);
        }

        playersTurn = true;
        enemiesMoving = false;
    }
}
